export const dynamicStatusColor = (statusType, colors) => {
  switch (statusType) {
    case 'Success':
      return colors.ifNonary;
    case 'Refund':
      return colors.sunshade;
    case 'Cancelled':
    case 'Denied':
    case 'Failed':
    case 'Rejected':
    case 'Blocked':
      return colors.ceriseRed;
    default:
      return colors.btnNonary;
  }
};
