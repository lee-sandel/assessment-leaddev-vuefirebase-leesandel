import {CollectionRef, DocRef, Document} from './data';
import * as events from 'events';

/**
 * A request to get documents from the store
 */
export interface GetDocumentsRequest extends Request {
  type: 'get-documents'
  ref: CollectionRef
}

/**
 * A request to get a document from the store
 */
export interface GetDocumentRequest extends Request {
  type: 'get-document'
  ref: DocRef
}

/**
 * A request to set a document value in the store
 */
export interface SetDocumentRequest extends Request {
  type: 'set-document'
  /**
   * If the path has an odd number of segments, e.g. `bookings`, an id will be generated
   * e.g. `bookings/123213`
   */
  ref: DocRef
  document: Document
}

export interface Request {
  type: string
}

/**
 * A server message with a collections documents. This will be sent for a {@link GetDocumentsRequest}.
 */
export interface CollectionResponse {
  ref: CollectionRef
  documents: GetDocumentResponse[]
}

/**
 * A server message with a single document. This may be sent for a {@link GetDocumentRequest}, or on update.
 */
export interface GetDocumentResponse {
  ref: DocRef
  document: Document
}

export type ChangeFunc = (change: GetDocumentResponse, store: Store) => void

export interface Store {
  getDoc(ref: DocRef): Document|undefined
  getCollection(ref: CollectionRef): Document[]
  setDoc(ref: DocRef, data: Document): Document[]
  bus: events.EventEmitter
}
