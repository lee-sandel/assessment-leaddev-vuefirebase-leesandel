/**
 * A booking represents the reservation of a {@link Room}.
 */
export interface Booking extends Document {
  title: string
  fromTime: Date | string
  toTime: Date | string
  room: {
    ref: DocRef,
    title: string
  }
}

/**
 * A room is a physical space that can be booked
 */
export interface Room extends Document {
  title: string
}

/**
 * A {@link DocRef} where the path is a collection, e.g. `bookings`
 */
export interface CollectionRef extends DocRef {

}

/**
 * DocRef represents a reference to a {@link Document} in the database
 */
export interface DocRef {
  /**
   * The fully qualified path to the {@link Document}
   * e.g. `bookings/id1`
   */
  path: string
}

/**
 * Document represents a document in the database
 */
export interface Document {
  lastWrittenTime?: Date|string
}
