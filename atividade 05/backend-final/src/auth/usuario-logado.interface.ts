// Formato de req.user (montado em JwtStrategy.validate a partir do token).
export interface UsuarioLogado {
  userId: number;
  email: string;
}
