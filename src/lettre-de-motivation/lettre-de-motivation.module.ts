import { Module } from '@nestjs/common';
import { LettreDeMotivationController } from './lettre-de-motivation.controller';
import { LettreDeMotivationService } from './lettre-de-motivation.service';
import { LettreDeMotivation, LettreDeMotivationSchema } from 'src/schemas/LettreDeMotivation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { KnnService } from 'src/knn/knn.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: LettreDeMotivation.name, schema: LettreDeMotivationSchema }])],
  controllers: [LettreDeMotivationController],
  providers: [LettreDeMotivationService,KnnService]
})
export class LettreDeMotivationModule {}
