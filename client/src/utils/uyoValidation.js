export const uyoLocalGovernmentAreas = [
  "Uyo", "Eket", "Ikot Ekpene", "Oron", "Abak", 
  "Etinan", "Ibesikpo Asutan", "Ibiono Ibom",
  "Ikono", "Ikot Abasi", "Itu", "Mkpat Enin",
  "Nsit Atai", "Nsit Ibom", "Nsit Ubium",
  "Obot Akara", "Okobo", "Onna", "Oruk Anam",
  "Udung Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko"
];

export const isUyoLocation = (location) => {
  if (!location) return false;
  return uyoLocalGovernmentAreas.some(lga => 
    location.city?.toLowerCase().includes(lga.toLowerCase()) || 
    location.address?.toLowerCase().includes(lga.toLowerCase()) ||
    location.area?.toLowerCase().includes(lga.toLowerCase())
  );
};

export const uyoLocationOptions = uyoLocalGovernmentAreas.map(lga => ({
  value: lga,
  label: lga
}));