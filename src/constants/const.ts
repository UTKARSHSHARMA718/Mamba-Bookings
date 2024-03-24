import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

export const ROUNDES_FOR_HASHING_PASSWORD = 12;
export const CREDENTIALS = "credentials";
export const COMPANY_NAME = "Mamba Bookings";
export const CATEGORIES = "categories";
export const SELECTED_CATEGORY = "selected-category";

export const categoriesToRender = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

// export const TILE_LAYER_URL =
//   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// export const TILE_LAYER_ATTRIBUTION =
//   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const TILE_LAYER_URL =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const TILE_LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const CENTER_COORDINATES = [51, -0.09];

export const RENT_MODAL_DATA = "user-data";
export const RENT_MODAL_DATA_STRUCTURE = {
  category: "",
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: "",
  price: 1,
  title: "",
  description: "",
};

export const SELECTED_DATE_CELL_COLOUR = "#262626";

export const VALID_RENT_SCREEN = [0, 1, 2, 3, 4, 5];

export const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export const MAX_ROOM_LIMIT = 50;
export const MAX_GUEST_LIMIT = 30;
export const MAX_BATHROOM_LIMIT = 10;
export const MIN_ROOM_LIMIT = 1;
export const MIN_GUEST_LIMIT = 1;
export const MIN_BATHROOM_LIMIT = 1;

export const searchFilters = [
  "guest",
  "bathrooms",
  "rooms",
  "location",
  "startDate",
  "endDate",
];

export const RENT_MODAL = "rent-modal";
export const LIGHT = "light";
export const DARK = "dark";
export const PAGE_SIZE = 10;
