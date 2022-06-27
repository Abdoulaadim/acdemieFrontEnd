export interface User {
  nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
  role ?: profile | any ;
}
enum profile{
  Admin,Enraineur,Joeur
}
