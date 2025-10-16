import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; // Importe para o Swagger
import { CreateTransactionDto } from './dto/create-transaction.dto';
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
}