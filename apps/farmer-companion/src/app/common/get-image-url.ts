import { BedDto, BoardDto } from "../api/models";

const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';


  /**
   * Gets the image url for the bed
   * @param bed bed to get image url for
   * @returns image url
   */
export function getImageUrlForBed(bed: BedDto) {
    // Get the first board that has a plant with image set
    const board = bed.boards.find((board) => board.plant?.image_url);
    return getImageUrlForBoard(board);
}

export function getImageUrlForBoard(board?: BoardDto) {
  return board?.plant?.image_url ?? FALLBACK_IMAGE_URL;
}