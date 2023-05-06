exports.calculateDistance = (lat1, long1, lat2, long2) => {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = long1 - long2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
};

const places = [];
exports.locations = [
  { name: "Rjm Pharmacy", lat: 11.123373672099854, lng: 122.53951943525163 },
  { name: "M.Beluso Store", lat: 11.123621103878914, lng: 122.53949087328024 },
  {
    name: "Rhiz Crafts and Sho",
    lat: 11.123401567559254,
    lng: 122.5390556708336,
  },
  {
    name: "7-Eleven Convenience Store",
    lat: 11.123019076683388,
    lng: 122.53905669968856,
  },
  { name: "RX Queen Pharmac", lat: 11.12310194703095, lat: 122.53889869838618 },
  { name: "Instyla Houseware", lat: 11.12306231695874, lng: 122.5389369373276 },
  { name: "LBC Calino", lat: 11.122898035166036, lng: 122.53892730849138 },
  {
    name: "Cebuana Lhuillier Pawnshop - Calinog, S. Osmeña, Calinog, Iloilo",
    lat: 11.12365873453976,
    lng: 122.5386369778028,
  },
  {
    name: "Samgyupsal Calino",
    lat: 11.123466847018694,
    lng: 122.53863399838632,
  },
  {
    name: "Rizal street (ilaya)",
    lat: 11.128899249548223,
    lng: 122.52870737965542,
  },
  {
    name: "The Immaculate Conception Paris",
    lat: 11.12350921643909,
    lng: 122.5380628949997,
  },
  { name: "Calinog Plaza", lat: 11.12293881519929, lng: 122.5381564962719 },
  { name: "Roxas Street", lat: 11.123225879241174, lng: 122.53968877847602 },
  { name: "Jollibee", lat: 11.122105950933179, lng: 122.53890708976911 },
  { name: "Delgado Stree", lat: 11.121526947175544, lng: 122.54141763740991 },
  {
    name: "Land Transportation Office",
    lat: 11.122187165620863,
    lng: 122.53636255504846,
  },
  {
    name: "Calinog Fire Station",
    lat: 11.122139789700626,
    lng: 122.53678482383573,
  },
  {
    name: "Calinog Elementary School",
    lat: 11.12166465346642,
    lng: 122.53831080390034,
  },
  { name: "Angel Hamburger", lat: 11.1217836506972, lng: 122.53885231707682 },
  { name: "Tan casa Resor", lat: 11.121681252764471, lng: 122.53889672406004 },
  { name: "New Food Mart", lat: 11.121122794400861, lng: 122.53907529977127 },
  {
    name: "GroupMates Coworking Space & Cafe",
    lat: 11.118617270543957,
    lng: 122.53865151074528,
  },
  {
    name: "Comprehensive National highschoo",
    lat: 11.117674908225135,
    lng: 122.53966637175895,
  },
  { name: "Hall of justice", lat: 11.115419349363714, lng: 122.53824012240486 },
  { name: "Carabao cente", lat: 11.115258949610945, lng: 122.53863410184412 },
  {
    name: "kalinong diagnostic center",
    lat: 11.118031056239275,
    lng: 122.53834470848844,
  },
  {
    name: "Dr. Ricardo S. Provido Memorial District Hospital",
    lat: 11.113749715995565,
    lng: 122.53976634713693,
  },
  { name: "Rjm Pharmacy", lat: 11.123457889068453, lng: 122.5395140702612 },
  {
    name: "Calinog Public market",
    lat: 11.124019034247764,
    lng: 122.53918114817152,
  },
  {
    name: "Helen's Agro Chemical Supply & Jra Hardwar",
    lat: 11.12261133840228,
    lng: 122.53967081004684,
  },
  {
    name: "Reymaries Bakery",
    lat: 11.123325361694345,
    lng: 122.54016569072085,
  },
  { name: "Roxas street", lat: 11.123462737986427, lng: 122.53955466586756 },
  {
    name: "Karan-an Sa Calinog, Calinog, Iloilo",
    lat: 11.12445338256491,
    lng: 122.53880691004704,
  },
  {
    name: "Karan-an Sa Calinog, Calinog, Iloilo",
    lat: 11.124484264299912,
    lng: 122.53971908121102,
  },
  { name: "Megahome", lat: 11.123434974074705, lng: 122.5397764253905 },
  {
    name: "Calinog Wet Market",
    lat: 11.124835642425525,
    lng: 122.54005004654164,
  },
  {
    name: "Yamaha Des Strong Motor",
    lat: 11.123467701521577,
    lng: 122.54186658121095,
  },
  { name: "Migs Pharmacy", lat: 11.123345310578648, lng: 122.54069478306216 },
  {
    name: "Calinog Health Cente",
    lat: 11.123507307003443,
    lng: 122.54082530421326,
  },
  {
    name: "King's Ground Vapes Calinog Calinog Gymnasiu",
    lat: 11.124663818966813,
    lng: 122.53827283888269,
  },
  { name: "Carisma Store", lat: 11.1245629824935, lng: 122.53938292539048 },
  {
    name: "Magsaysay street",
    lat: 11.124580019003218,
    lng: 122.53846273888277,
  },
  {
    name: "Mary Immaculate Academy",
    lat: 11.126784862552714,
    lng: 122.5411133407339,
  },
  {
    name: "Imperial Appliance Plaza",
    lat: 11.125568460229955,
    lng: 122.53914470421344,
  },
  { name: "The Glend", lat: 11.125605545766385, lng: 122.538811311898 },
  { name: "Seaoil", lat: 11.126032405537392, lng: 122.53894907722878 },
  { name: "CLH Calinog", lat: 11.127665317663316, lng: 122.53946572539044 },
  { name: "Libot Calinog", lat: 11.131590482664144, lng: 122.53942639531427 },
  { name: "Calinog Astrodome", lat: 11.12889623586208, lng: 122.5382885560775 },
  {
    name: "Calinog Terminal",
    lat: 11.128511400610247,
    lng: 122.53844382781524,
  },
  { name: "Save More", lat: 11.127885379218275, lng: 122.53905488685352 },
  {
    name: "Prince Hypermart Calinog",
    lat: 11.127151725860198,
    lng: 122.53908331268876,
  },
];
