import { Injectable, NotFoundException } from '@nestjs/common';
// import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Reservation } from './schemas/reservations.schema';

interface Room {
  type: string;
  number: number;
}

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: mongoose.Model<Reservation>,
  ) {}

  async create(createdReservation: Reservation) {
    const createdReservations =
      await this.reservationModel.create(createdReservation);
    return createdReservations;
  }

  async findAll() {
    const reservations = await this.reservationModel.find().exec();
    return reservations;
  }

  async findAllUserReservations(userId: string) {
    return await this.reservationModel.find({ userId: userId }).exec();
  }

  async findOne(id: string, userId: string) {
    const reservation = await this.reservationModel.findById(id);
    if (reservation.userId !== userId) {
      throw new NotFoundException('Reservation not found');
    }

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  async remove(id: string, userId: string) {
    const reservation = await this.reservationModel.findById(id);
    if (reservation.userId !== userId) {
      throw new NotFoundException('Reservation not found');
    }

    const reservationToDelete =
      await this.reservationModel.findByIdAndDelete(id);

    if (!reservationToDelete) {
      throw new NotFoundException('Reservation not found');
    }

    return reservationToDelete;
  }

  async checkOccupiedRooms(
    arrivalDate: Date,
    departureDate: Date,
    hotelId: string,
  ) {
    const reservations = await this.reservationModel.find({
      hotelId: hotelId,
      $or: [
        {
          checkIn: { $gte: arrivalDate },
          checkOut: { $lte: departureDate },
        },
      ],
    });

    const calculateTotalRoomsByType = (
      reservations: Reservation[],
    ): Record<string, number> => {
      return reservations.reduce(
        (acc: Record<string, number>, reservation: Reservation) => {
          reservation.rooms.forEach((room: Room) => {
            if (acc[room.type]) {
              acc[room.type] += room.number;
            } else {
              acc[room.type] = room.number;
            }
          });
          return acc;
        },
        {},
      );
    };

    const roomsBooked = calculateTotalRoomsByType(reservations);
    return roomsBooked;
  }
}
