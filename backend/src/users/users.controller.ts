import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// @Controller('users') é um decorador que indica que a classe UsersController é um controlador e que todas as rotas definidas nesta classe serão prefixadas com '/users'.
@ApiTags('users')
@Controller('users')
export class UsersController {
  // O construtor recebe o UsersService como parâmetro e o injeta na classe.
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  // @Post() é um decorador que indica que a função create é um endpoint HTTP POST.
  // @Body() é um decorador que indica que a função create recebe um parâmetro body.
  // createUserDto é uma classe que define a estrutura do corpo da requisição.
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  // findAll é uma função que vai retornar todos os usuários cadastrados no banco de dados.
  // O @Get() é um decorador que indica que a função findAll é um endpoint HTTP GET.
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  // findOne é uma função que vai retornar um usuário específico cadastrado no banco de dados.
  // O @Get() é um decorador que indica que a função findOne é um endpoint HTTP GET.
  // @Param() é um decorador que indica que a função findOne recebe um parâmetro id.
  // id é uma string que representa o id do usuário.
  // +id é uma string que representa o id do usuário.
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  // update é uma função que vai atualizar um usuário específico cadastrado no banco de dados.
  // O @Patch() é um decorador que indica que a função update é um endpoint HTTP PATCH.
  // @Param() é um decorador que indica que a função update recebe um parâmetro id.
  // id é uma string que representa o id do usuário.
  // +id é uma string que representa o id do usuário.
  // @Body() é um decorador que indica que a função update recebe um parâmetro body.
  // updateUserDto é uma classe que define a estrutura do corpo da requisição.
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  // remove é uma função que vai remover um usuário específico cadastrado no banco de dados.
  // O @Delete() é um decorador que indica que a função remove é um endpoint HTTP DELETE.
  // @Param() é um decorador que indica que a função remove recebe um parâmetro id.
  // id é uma string que representa o id do usuário.
  // +id é uma string que representa o id do usuário.
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
