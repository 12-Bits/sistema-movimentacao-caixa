import { Controller, Post, Body, Get, Query, Delete, Param, NotFoundException} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; 
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ListTransactionsDto } from './dto/list-transactions.dto';
import { CashflowService } from './cashflow.service'; 

@ApiTags('cashflow') // Tag para o Swagger
@Controller('cashflow')
export class CashflowController {
  constructor(private readonly cashflowService: CashflowService) {}

  @Post('transaction')
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.cashflowService.createTransaction(createTransactionDto);
  }

  @Get('balance')
  getBalance() {
    // Implementação do serviço
    return this.cashflowService.getCurrentBalance();
  }

  @Get('transactions')
  listTransactions(@Query() query: ListTransactionsDto) {
    return this.cashflowService.listTransactions(query);
  }
  
  // NOVO: DELETE /cashflow/transaction/:id
  @Delete('transaction/:id')
  deleteTransaction(@Param('id') id: string) {
    const deleted = this.cashflowService.deleteTransaction(id);
    if (!deleted) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return { message: `Transaction ${id} deleted successfully` };
  }
  
  @Get('summary')
  getSummary() {
    return this.cashflowService.getSummary();
  }
}