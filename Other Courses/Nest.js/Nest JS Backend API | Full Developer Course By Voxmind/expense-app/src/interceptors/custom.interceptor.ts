import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    // console.log("THIS IS INTERCEPTING THE REQUEST");
    // console.log({ context });
    return handler.handle().pipe(
      map((data) => {
        // console.log("THIS IS INTERCEPTING THE RESPONSE");
        const response = {
          ...data,
          createdAt: data.created_at
        };

        delete response.updated_at;
        delete response.created_at;

        return response;
      })
    );
  }
}
