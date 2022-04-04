export const distanceToScroll = (
  contactsContainerOffset: number,
  widthOfContactCard: number,
  marginOfContactCard: number
) => {
  const contactCardSpacing = widthOfContactCard + marginOfContactCard;
  const numberOfTilesInView = Math.round(
    contactsContainerOffset / contactCardSpacing
  );
  return numberOfTilesInView * contactCardSpacing;
};

export const calculateScrollDistance = (
  forward: boolean,
  distanceToScroll: number,
  distanceScrolled: number,
  offset?: number
) => {
  const scrollInThisDirection = forward ? distanceToScroll : -distanceToScroll;
  const movement = scrollInThisDirection + distanceScrolled;
  return offset ? movement + offset : movement;
};
