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
    return dist
}

const places = [
 
,"Rjm Pharmacy"
,"M.Beluso Store"
," Rhiz Crafts and Sho"
,"7-Eleven Convenience Stor"
,"RX Queen Pharmac"
," Instyla Housewar"
," LBC Calino"
," Cebuana Lhuillier Pawnshop Calino"
," Samgyupsal Calino"
,"Rizal street (ilaya"
," The Immaculate Conception Paris"
," Calinog Plaz"
,"Roxas Stree"
," Jollibe"
,"Delgado Stree"
," Land Transportation Offic"
,"Calinog fire statio"
,"Calinog Elementary Schoo"
,"Angel Hamburge"
,"Tan casa Resor"
,"Chooks to g"
,"New Food Mar"
," Simsiman Calinog Iloil"
," Comprehensive National highschoo"
,"Hall of justic"
," Carabao cente"
," kalinong diagnostic cente"
," Dr. Ricardo S. Provido Memorial District Hospital"
]
exports.locations = [
  {
    name:"Rjm Pharmacy",
    lat:11.123457889068453, 
    lng:122.5395140702612
  },
  {
    name:"Calinog Public market",
    lat:11.124019034247764, 
    lng:122.53918114817152
  },
  {
    name:"Helen's Agro Chemical Supply & Jra Hardwar",
    lat:11.12261133840228, 
    lng:122.53967081004684
  },
  {
    name:"Reymaries Bakery",
    lat:11.123325361694345, 
    lng:122.54016569072085
  },
  {
    name:"Roxas street",
    lat:11.123462737986427, 
    lng:122.53955466586756
  },
  {
    name:"Karan-an Sa Calinog, Calinog, Iloilo",
    lat:11.12445338256491, 
    lng:122.53880691004704
  },
  {
    name:"Karan-an Sa Calinog, Calinog, Iloilo",
    lat:11.124484264299912, 
    lng:122.53971908121102
  },
  {
    name:"Megahome",
    lat:11.123434974074705, 
    lng:122.5397764253905
  },
  {
    name:"Calinog Wet Market",
    lat:11.124835642425525, 
    lng:122.54005004654164
  },
  {
    name:"Yamaha Des Strong Motor",
    lat:11.123467701521577, 
    lng:122.54186658121095
  },
  {
    name:"Migs Pharmacy",
    lat:11.123345310578648, 
    lng:122.54069478306216
  },
  {
    name:"Calinog Health Cente",
    lat:11.123507307003443, 
    lng:122.54082530421326
  },
  {
    name:"King's Ground Vapes Calinog Calinog Gymnasiu",
    lat:11.124663818966813, 
    lng:122.53827283888269
  },
  {
    name:"Carisma Store",
    lat:11.1245629824935, 
    lng:122.53938292539048
  },
  {
    name:"Magsaysay street",
    lat:11.124580019003218, 
    lng:122.53846273888277
  },
  {
    name:"Mary Immaculate Academy",
    lat:11.126784862552714, 
    lng:122.5411133407339
  },
  {
    name:"Imperial Appliance Plaza",
    lat:11.125568460229955 , 
    lng:122.53914470421344
  },
  {
    name:"The Glend",
    lat:11.125605545766385 , 
    lng:122.538811311898
  },
  {
    name:"Seaoil",
    lat:11.126032405537392 , 
    lng:122.53894907722878
  },
  {
    name:"CLH Calinog",
    lat:11.127665317663316 , 
    lng:122.53946572539044
  },
  {
    name:"Libot Calinog",
    lat:11.131590482664144, 
    lng:122.53942639531427
  },
  {
    name:"Calinog Astrodome",
    lat:11.12889623586208,  
    lng:122.5382885560775
  },
  {
    name: "Calinog Terminal",
    lat: 11.128511400610247,
    lng: 122.53844382781524,
  },
  { name: "Save More",
    lat: 11.127885379218275,
    lng: 122.53905488685352
  },
  { name: "Save More",
    lat: 11.127885379218275,
    lng: 122.53905488685352
  },
  { name: "Prince Hypermart Calinog",
    lat: 11.127151725860198,
    lng: 122.53908331268876
  },

];
