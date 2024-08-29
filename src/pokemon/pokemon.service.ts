import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>) { }


  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon
    } catch (err) {
      this.handleExceptions(err);
    }


  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }


    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }

    if (!pokemon) throw new NotFoundException(`Pokemon ${term} not found`)
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    try {
      const pokemon: Pokemon = await this.findOne(term);

      await pokemon.updateOne(updatePokemonDto);

      return { ...pokemon.toJSON(), ...updatePokemonDto }

    } catch (error) {
      this.handleExceptions(error);
    }


  }

  async remove(id: string) {
    // const pokemon: Pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    // const result = await this.pokemonModel.findByIdAndDelete(id)
    const {deletedCount} = await this.pokemonModel.deleteOne({ _id: id })
   if(deletedCount === 0){
    throw new BadRequestException(`Pokemon with ${id} not found`);
   }

  }


  private handleExceptions(error: any) {
    if (error.code === 11000) throw new BadRequestException(`Pokemon with ${JSON.stringify(error.keyValue)} already exists`)

    console.log(error)
    throw new InternalServerErrorException("Cant createPokemon - Check logs")
  }
}
