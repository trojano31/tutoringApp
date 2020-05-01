import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      context: ({ req, res }) => ({ req, res }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    AuthModule,
    SubjectModule,
  ],
  providers: [AppService],
})
export class AppModule {
}
