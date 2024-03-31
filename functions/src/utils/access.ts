export const checkAccess = async (user_id: string, canAccess: string[]): Promise<any> => {
  try {
    const access: any = { allowed: false, role: '' }
    if (!user_id) {
      return access
    }
    if (!canAccess || (canAccess && !canAccess.length)) {
      return access
    }

    return access
  } catch (err) {
    return { allowed: false, role: '' }
  }
}
