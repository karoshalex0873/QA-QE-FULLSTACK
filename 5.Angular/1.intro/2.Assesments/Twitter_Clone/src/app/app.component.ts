import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../service/users.service';
import { PostService } from '../service/post.service';
import { CommentService } from '../service/comment.service';
import { Post, User, Comment } from '../Types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: User[] = [];
  posts: Post[] = [];
  comments: Comment[] = [];
  selectedUser: User | null = null;
  selectedPost: Post | null = null;
  isLoading = false;
  errorMessage = '';

  // Inject services
  private userService = inject(UsersService);
  private postService = inject(PostService);
  private commentService = inject(CommentService);

  ngOnInit(): void {
    this.loadUsers();
  }

  // image url data binding
  imageUrl="https://i.pinimg.com/736x/90/e8/33/90e833716a8ec02a67a092a749146116.jpg"

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        // Auto-select first user
        this.onUserSelect(users[0].id);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load users';
        this.isLoading = false;
      }
    });
  }

  onUserSelect(userId: number) {
    this.selectedUser = this.users.find(u => u.id === userId) || null;
    this.selectedPost = null;
    this.comments = [];
    
    if (this.selectedUser) {
      this.loadUserPosts(userId);
    }
  }

  private loadUserPosts(userId: number) {
    this.isLoading = true;
    this.postService.getPostByUser(userId).subscribe({
      next: (posts) => {
        this.posts = posts;
        if (posts.length) {
          // Auto-select first post
          this.onPostSelect(posts[0].id);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load posts';
        this.isLoading = false;
      }
    });
  }

  onPostSelect(postId: number) {
    this.selectedPost = this.posts.find(p => p.id === postId) || null;
    this.loadPostComments(postId);
  }

  private loadPostComments(postId: number) {
    this.isLoading = true;
    this.commentService.getCommentsByPost(postId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load comments';
        this.isLoading = false;
      }
    });
  }
}