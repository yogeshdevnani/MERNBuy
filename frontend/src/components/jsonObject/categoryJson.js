import {
  SoupKitchen,
  LaptopTwoTone,
  Construction,
  AcUnit,
  CheckroomTwoTone,
  MedicationLiquidTwoTone,
  DesignServicesTwoTone,
  ChairTwoTone,
  CelebrationTwoTone,
  CardGiftcardTwoTone,
  BreakfastDiningTwoTone,
  ToysTwoTone,
  ShoppingBagOutlined,
} from "@mui/icons-material";

//this component contains necessary json objects
export const categories = [
  {
    id: 0,
    title: "All",
    icon: ShoppingBagOutlined,
  },
  {
    id: 1,
    title: "Electronics",
    icon: LaptopTwoTone,
  },
  {
    id: 2,
    title: "Kitchen",
    icon: SoupKitchen,
  },
  {
    id: 3,
    title: "Hardware & Tools",
    icon: Construction,
  },
  {
    id: 4,
    title: "Seasonal",
    icon: AcUnit,
  },
  {
    id: 5,
    title: "Clothes & Accessories",
    icon: CheckroomTwoTone,
  },
  {
    id: 6,
    title: "Health & Beauty",
    icon: MedicationLiquidTwoTone,
  },
  {
    id: 7,
    title: "Stationary & Craft",
    icon: DesignServicesTwoTone,
  },
  {
    id: 8,
    title: "Home Decor",
    icon: ChairTwoTone,
  },
  {
    id: 9,
    title: "Celebration",
    icon: CelebrationTwoTone,
  },
  {
    id: 10,
    title: "Cards",
    icon: CardGiftcardTwoTone,
  },
  {
    id: 11,
    title: "Food",
    icon: BreakfastDiningTwoTone,
  },
  {
    id: 12,
    title: "Toys",
    icon: ToysTwoTone,
  },
];

export const priceListFilter = [
  {
    id: 0,
    title: "All",
    minValue: -1,
    maxValue: -1,
  },
  {
    id: 1,
    title: "Under $25",
    minValue: 1,
    maxValue: 25,
  },
  {
    id: 2,
    title: "$25 to $50",
    minValue: 25,
    maxValue: 50,
  },
  {
    id: 3,
    title: "$50 to $100",
    minValue: 50,
    maxValue: 100,
  },
  {
    id: 4,
    title: "$100 to $200",
    minValue: 100,
    maxValue: 200,
  },
  {
    id: 5,
    title: "$200 & Above",
    minValue: 200,
    maxValue: 99999999999,
  },
];

export const review = [
  {
    id: 0,
    title: "All",
  },
  {
    id: 4,
    title: "4",
  },
  {
    id: 3,
    title: "3",
  },
  {
    id: 2,
    title: "2",
  },
  {
    id: 1,
    title: "1",
  },
];
