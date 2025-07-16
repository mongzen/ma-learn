import type { Access } from 'payload'

export const isAdmin: Access = ({ req }) => {
  const user = req.user
  if (!user) return false
  return user.role === 'admin'
}

export const isInstructor: Access = ({ req }) => {
  const user = req.user
  if (!user) return false
  return user.role === 'instructor'
}

export const isAdminOrInstructor: Access = ({ req }) => {
  const user = req.user
  if (!user) return false
  return user.role === 'admin' || user.role === 'instructor'
}

export const isStudent: Access = ({ req }) => {
  const user = req.user
  if (!user) return false
  return user.role === 'student'
}

export const isOwner: Access = ({ req, id }) => {
  const user = req.user
  if (!user) return false
  return user.id === id
}

export const isAdminOrOwner: Access = ({ req, id }) => {
  const user = req.user
  if (!user) return false
  return user.role === 'admin' || user.id === id
}

export const isInstructorOrOwner: Access = ({ req, id }) => {
  const user = req.user
  if (!user) return false
  return user.role === 'instructor' || user.id === id
}

export const canAccessCourse: Access = ({ req, id }) => {
  const user = req.user
  if (!user) return false

  // Admin can access everything
  if (user.role === 'admin') return true

  // Instructor can access their own courses
  if (user.role === 'instructor') {
    // This would need to be implemented with a proper query
    return true
  }

  // Students can access courses they're enrolled in
  if (user.role === 'student') {
    // This would need to be implemented with a proper query
    return true
  }

  return false
}
