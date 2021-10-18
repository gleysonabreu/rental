interface IUserResponseDTO {
  email: string;
  name: string;
  id: string;
  avatar: string;
  driverLicense: string;
  avatarURL(): string;
}

export { IUserResponseDTO };
