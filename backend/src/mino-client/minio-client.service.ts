import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {MINIO_CONNECTION} from 'nestjs-minio/dist';
import {ImageTypes} from './imageTypes';
// tslint:disable-next-line:no-var-requires
const sharp = require('sharp');

@Injectable()
export class MinioClientService {
    constructor(@Inject(MINIO_CONNECTION) private readonly minioClient) {
    }

    bucketName = 'avatars';

    async createBucketsIfNotExists(): Promise<void> {
        const exists = await this.minioClient.bucketExists(this.bucketName);
        if (!exists) {
            this.minioClient.makeBucket(this.bucketName);
        }
    }

    async uploadImage(buffer: Buffer, size: number, metadata: string, userId: string): Promise<void> {
        await this.createBucketsIfNotExists();

        const avatar = await this.processAvatar(buffer);
        const galleryItem = await this.processGalleryItem(buffer);
        const miniature = await this.processMiniature(buffer);

        await this.minioClient.putObject(this.bucketName, `${userId}_avatar`, avatar, size, metadata);
        await this.minioClient.putObject(this.bucketName, `${userId}_gallery`, galleryItem, size, metadata);
        await this.minioClient.putObject(this.bucketName, `${userId}_miniature`, miniature, size, metadata);
    }

    async processAvatar(image: Buffer): Promise<Buffer> {
        return sharp(image)
            .resize(60)
            .toBuffer();
    }

    async processGalleryItem(image: Buffer): Promise<Buffer> {
        return sharp(image)
            .resize(500)
            .toBuffer();
    }

    async processMiniature(image: Buffer): Promise<Buffer> {
        return sharp(image)
            .resize(200)
            .toBuffer();
    }

    async getImage(imageType: ImageTypes, userId: string): Promise<Buffer> {
        try {
            return await this.minioClient.getObject(this.bucketName, `${userId}_${imageType.toString().toLowerCase()}`);
        } catch (e) {
            throw new NotFoundException('Image not found');
        }
    }
}
