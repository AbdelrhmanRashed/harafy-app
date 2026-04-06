export type ProfileStatus =
  | 'Pending'
  | 'UnderReview'
  | 'Approved'
  | 'Rejected'
  | 'Suspended'
  | 'Completed';

export const mapProfileStatus = (status: number): ProfileStatus => {
  switch (status) {
    case 0:
      return 'Pending';
    case 1:
      return 'UnderReview';
    case 2:
      return 'Approved';
    case 3:
      return 'Rejected';
    case 4:
      return 'Suspended';
    case 5:
      return 'Completed';
    default:
      return 'Pending';
  }
};
