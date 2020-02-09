import { ArgumentMetadata, Injectable, PipeTransform, Logger } from '@nestjs/common';

@Injectable()
export class EnhanceWebsocketRequestPipe implements PipeTransform {
  private logger: Logger = new Logger(EnhanceWebsocketRequestPipe.name);
  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug("transform | value: " + JSON.stringify(value));
    return value;
  }
}
