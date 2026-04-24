import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Dipirona 1g', description: 'nome do produto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 12.99, description: 'preço do produto' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 10, description: 'estoque do produto' })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

}

