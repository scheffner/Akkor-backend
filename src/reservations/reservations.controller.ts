import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtService } from '@nestjs/jwt';
import { Reservation } from './schemas/reservations.schema';
import { EmployeOrAdminGuard } from '../guards/employeOrAdminGuard';
import { ApiTags } from '@nestjs/swagger';
import { HotelsService } from 'src/hotels/hotels.service';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly hotelSercice: HotelsService,
    private jwtService: JwtService,
  ) {}

  @Post()
  create(@Req() req: Request, @Body() createReservation: Reservation) {
    const token = (req.headers as any).authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token);
    const userId = payload.sub;
    createReservation.userId = userId;
    return this.reservationsService.create(createReservation);
  }

  @Get('/findAll')
  @UseGuards(EmployeOrAdminGuard)
  findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Get('/reservationsByUser')
  findAllUserReservations(@Req() req: Request): Promise<Reservation[]> {
    const token = (req.headers as any).authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token);
    const userId = payload.sub;
    return this.reservationsService.findAllUserReservations(userId);
  }

  @Post('/checkAvailableRooms/')
  async checkAvailableRooms(
    @Body()
    body: {
      arrivalDate: string;
      departureDate: string;
      hotelId: string;
    },
  ): Promise<object> {
    const { arrivalDate, departureDate, hotelId } = body;
    const queryStartDate = new Date(arrivalDate);
    const queryEndDate = new Date(departureDate);

    const roomsOfHotel = await this.hotelSercice.getNumberOfRooms(hotelId);
    const checkOccupiedRooms =
      await this.reservationsService.checkOccupiedRooms(
        queryStartDate,
        queryEndDate,
        hotelId,
      );

    const availableRooms = roomsOfHotel.reduce((acc, item) => {
      const occupied = checkOccupiedRooms[item.type] || 0;

      acc[item.type] = item.number - occupied;

      return acc;
    }, {});
    console.log(availableRooms);
    return availableRooms;
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    const token = (req.headers as any).authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token);
    const userId = payload.sub;
    return this.reservationsService.findOne(id, userId);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    const token = (req.headers as any).authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token);
    const userId = payload.sub;
    return this.reservationsService.remove(id, userId);
  }
}
