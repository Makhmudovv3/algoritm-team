/**
 * Attendance calculation utilities
 */

/**
 * Calculates the attendance statistics from a list of attendance records.
 * @param {Array} attendances - Array of attendance objects.
 * @returns {Object} - An object containing present, absent, excused, total, and percentage.
 */
export function calculateAttendanceStats(attendances = []) {
  if (!attendances || attendances.length === 0) {
    return { present: 0, absent: 0, excused: 0, total: 0, percentage: 0 };
  }

  const present = attendances.filter(a => a.status === 'present').length;
  const absent = attendances.filter(a => a.status === 'absent').length;
  const excused = attendances.filter(a => a.status === 'excused').length;
  
  // As per requirement: Dars bo'lmagan kun attendance hisobiga kiritilmasin.
  // This implies 'total' is the sum of present, absent, and excused.
  const total = present + absent + excused;
  
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return { present, absent, excused, total, percentage };
}

/**
 * Aggregates attendances by a specific key (e.g., student_id, group_id, date)
 * @param {Array} attendances 
 * @param {string} key 
 * @returns {Object} - Map of key to array of attendances
 */
export function groupAttendancesBy(attendances, key) {
  return attendances.reduce((acc, a) => {
    const val = a[key];
    if (val) {
      if (!acc[val]) acc[val] = [];
      acc[val].push(a);
    }
    return acc;
  }, {});
}
