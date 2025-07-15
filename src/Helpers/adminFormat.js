export const adminFormat = (adminRole) => {
  return adminRole?.replace('ROLE_', '')
}