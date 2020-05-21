import {
    BadRequestException,
    Controller,
    forwardRef,
    Get,
    Inject,
    Post,
    Query, Req, Res,
    UploadedFile, UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {MinioClientService} from './minio-client.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiBody, ApiConsumes, ApiQuery} from '@nestjs/swagger';
import {ImageTypes} from './imageTypes';
import {AuthGuard} from '@nestjs/passport';

@Controller('storage')
export class MinioClientController {
    constructor(@Inject(forwardRef(() => MinioClientService)) private readonly minioService) {
    }

    @Post()
    @UseGuards(AuthGuard())
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file',
        {
            fileFilter: (req: Request, file, callback) => {
                const ext = file.mimetype.split('/')[1];
                const isValidExtension = ext.match('jpeg|png');
                if (isValidExtension == null) {
                    return callback(new BadRequestException('Extension not allowed'), false);
                }
                return callback(null, true);
            },
        }))
    async uploadedFile(@UploadedFile() file, @Req() req: any): Promise<void> {
        const userId = req.user.id.toString();
        await this.minioService.uploadImage(file.buffer, file.size, file.mimetype, userId);
    }

    @Get()
    @ApiQuery({name: 'imageType', enum: ImageTypes})
    async getImage(@Query('imageType') imageType: ImageTypes, @Query('userId') userId: string, @Res() res) {
        const stream = await this.minioService.getImage(imageType, userId);
        res.set({
            'Content-Type': 'image/png',
        });
        return stream.pipe(res);
    }
}
