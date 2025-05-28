import { Injectable } from '@nestjs/common';
import { JsonResponse } from './Utils/JsonResponse';

@Injectable()
export class AppService {
  // Base Path
  // returns json response
  basePath() {
    return JsonResponse.response(200, 'ANX-TV Backend', null);
  }
}
