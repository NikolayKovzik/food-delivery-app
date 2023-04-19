import testImg from './assets/images/image_grilled_fish.jpg'
import { NotificationType, CardType } from './types'
export const mockCards: CardType[] = [
  {
    cardId: '1',
    description: 'spicy food',
    imgSrc: testImg,
    isFavorite: false,
    moneySign: '$',
    name: 'dumpligs',
    price: 1.2,
  },
  {
    cardId: '2',
    description: 'spicy food',
    imgSrc: testImg,
    isFavorite: false,
    moneySign: '$',
    name: 'dumpligs',
    price: 1.2,
  },
  {
    cardId: '3',
    description: 'spicy food',
    imgSrc: testImg,
    isFavorite: false,
    moneySign: '$',
    name: 'dumpligs',
    price: 1.2,
  },
]

export const mockNotifications: NotificationType[] = [
  {
    courierAvatar: testImg,
    courierName: 'Budi',
    courierSurname: 'Sanjaya',
    courierInfo: 'Food courier',
    orderId: '78A6767',
    phoneNumber: '+7 8A676778A6767',
    deliveryTime: '45 minutes',
    deliveryAddress: 'Tulungagung City',
  },
  {
    courierAvatar: testImg,
    courierName: 'Budi',
    courierSurname: 'Sanjaya',
    courierInfo: 'Food courier',
    orderId: '78A612e767',
    phoneNumber: '+7 8A676778A6767',
    deliveryTime: '45 minutes',
    deliveryAddress: 'Tulungagung City',
  },
  {
    courierAvatar: testImg,
    courierName: 'Budi',
    courierSurname: 'Sanjaya',
    courierInfo: 'Food courier',
    orderId: '78A676127',
    phoneNumber: '+7 8A676778A6767',
    deliveryTime: '45 minutes',
    deliveryAddress: 'Tulungagung City',
  },
]
