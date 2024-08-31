import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adappter';

@Module({
    providers: [AxiosAdapter],
    exports:[AxiosAdapter]
})
export class CommonModule {}
