import { Controller, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { interval, map, Observable } from 'rxjs';

interface MessageEvent {
  data: string | object;
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Sse('event')
  sendEvent(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((num: number) => ({
        data: 'hello ' + num,
      })),
    );
  }
}
