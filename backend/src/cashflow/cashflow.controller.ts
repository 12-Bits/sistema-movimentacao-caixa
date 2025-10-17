import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; // Importe para o Swagger
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiResponse } from '@nestjs/swagger'; // Importe para o Swagger
import { SummaryDto } from './dto/summary.dto'; // Importe o DTO
import { CashflowService } from './cashflow.service'; 

@ApiTags('cashflow') // Tag para o Swagger
@Controller('cashflow')
export class CashflowController {
  constructor(private readonly cashflowService: CashflowService) {}

  @Post('transaction')
  create(@Body() createTransactionDto: CreateTransactionDto) {
    // Implementação do serviço
    return this.cashflowService.createTransaction(createTransactionDto);
  }

  @Get('balance')
  getBalance() {
    // Implementação do serviço
    return this.cashflowService.getCurrentBalance();
  }

  @Get('summary') // 🚨 Novo endpoint: /cashflow/summary
  @ApiResponse({ status: 200, type: SummaryDto })
  getSummary() {
    return this.cashflowService.getSummary();
  }

}