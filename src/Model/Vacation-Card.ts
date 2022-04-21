export interface VacationCardModel {
  title: string;
  destination: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  image?: string;
  vacationId?: number;
  isFollowByUser?: boolean;
  isOnEditMode?: boolean
}
