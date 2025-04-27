export interface Usuario {
  uid: string; // o mesmo UID do Firebase Auth
  nome: string;
  email: string;
  criadoEm?: Date; // campo opcional de timestamp
}
