import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('健康检查')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @ApiResponse({
    status: 200,
    description: '健康检查',
  })
  @Get()
  @HealthCheck()
  check() {
    return {
      status: {
        up: 'OK'
      }
    }
    // return this.health.check([
    //   () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    // ]);
  }
}