import { Module } from '@nestjs/common';
import { CriticalPath } from './criticalpath';

@Module({
    imports: [CriticalPath]
})
export class ToolsModule {}
