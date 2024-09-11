export const carBrands = [
  { value: "Acura", label: "Acura" },
  { value: "Alfa Romeo", label: "Alfa Romeo" },
  { value: "Aston Martin", label: "Aston Martin" },
  { value: "Audi", label: "Audi" },
  { value: "Bentley", label: "Bentley" },
  { value: "BMW", label: "BMW" },
  { value: "Bugatti", label: "Bugatti" },
  { value: "Buick", label: "Buick" },
  { value: "Cadillac", label: "Cadillac" },
  { value: "Chevrolet", label: "Chevrolet" },
  { value: "Chrysler", label: "Chrysler" },
  { value: "Citroen", label: "Citroen" },
  { value: "Dodge", label: "Dodge" },
  { value: "Ferrari", label: "Ferrari" },
  { value: "Fiat", label: "Fiat" },
  { value: "Ford", label: "Ford" },
  { value: "Genesis", label: "Genesis" },
  { value: "GMC", label: "GMC" },
  { value: "Honda", label: "Honda" },
  { value: "Hyundai", label: "Hyundai" },
  { value: "Infiniti", label: "Infiniti" },
  { value: "Jaguar", label: "Jaguar" },
  { value: "Jeep", label: "Jeep" },
  { value: "Kia", label: "Kia" },
  { value: "Lamborghini", label: "Lamborghini" },
  { value: "Land Rover", label: "Land Rover" },
  { value: "Lexus", label: "Lexus" },
  { value: "Lincoln", label: "Lincoln" },
  { value: "Maserati", label: "Maserati" },
  { value: "Mazda", label: "Mazda" },
  { value: "McLaren", label: "McLaren" },
  { value: "Mercedes-Benz", label: "Mercedes-Benz" },
  { value: "Mini", label: "Mini" },
  { value: "Mitsubishi", label: "Mitsubishi" },
  { value: "Nissan", label: "Nissan" },
  { value: "Pagani", label: "Pagani" },
  { value: "Peugeot", label: "Peugeot" },
  { value: "Porsche", label: "Porsche" },
  { value: "Ram", label: "Ram" },
  { value: "Renault", label: "Renault" },
  { value: "Rolls-Royce", label: "Rolls-Royce" },
  { value: "Saab", label: "Saab" },
  { value: "Subaru", label: "Subaru" },
  { value: "Suzuki", label: "Suzuki" },
  { value: "Tesla", label: "Tesla" },
  { value: "Toyota", label: "Toyota" },
  { value: "Volkswagen", label: "Volkswagen" },
  { value: "Volvo", label: "Volvo" },
];

//vehicleTypes

export const vehicleTypes = [
  "Sedan",
  "Economy",
  "Sport",
  "SUV",
  "Luxury",
  "Super",
];

//powerSystemOptions

export const powerSystemOptions = ["Conventional", "Electric", "Hybrid"];

//transmissionOptions

export const transmissionOptions = ["Automatic", "Manual"];

//fuelOptions

export const fuelOptions = ["Gasoline", "Diesel", "Electric", "Hybrid"];

//doorsOptions

export const doorsOptions = [2, 4];

//seatsOptions

export const seatsOptions = [2, 4, 5, 7, 9];

//yearsOptions

export const yearsOptions = Array.from(
  { length: 31 },
  (_, i) => new Date().getFullYear() + 1 - i
);
