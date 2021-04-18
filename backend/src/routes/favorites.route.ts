import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import FavoriteController from "../controllers/favorite.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateCityDto, CreateCityIdDto} from "../dtos/weather.dto";


class FavoriteRoutes implements Route {
  public path = '/favorite';
  public router = Router();
  public favoriteCitiesController = new FavoriteController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,  this.favoriteCitiesController.getFavoriteCities);
    this.router.get(`${this.path}/:apiId`, validationMiddleware(CreateCityIdDto, "params"), this.favoriteCitiesController.getCityById);
    this.router.delete(`${this.path}/:apiId`, validationMiddleware(CreateCityIdDto, "params"), this.favoriteCitiesController.deleteCity);
    this.router.post(`${this.path}`, validationMiddleware(CreateCityDto, "body"), this.favoriteCitiesController.addCity);
  }
}

export default FavoriteRoutes;
