import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsApi='https://jsonplaceholder.typicode.com/comments'
  constructor( private http:HttpClient) { }

  getCommentsByPost(postId:number):Observable<Comment []>{
    return this.http.get<Comment[]>(`${this.commentsApi}?postId=${postId}`)
  }
}
