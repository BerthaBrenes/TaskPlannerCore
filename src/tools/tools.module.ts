import { Module } from '@nestjs/common';
import { CriticalPath } from './criticalpath';
import { Graph } from './graph';
import { Node } from './node';

@Module({
    imports: [CriticalPath, Node, Graph]
})
export class ToolsModule {}
