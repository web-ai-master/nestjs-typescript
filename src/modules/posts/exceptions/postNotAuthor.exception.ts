import { UnauthorizedException } from '@nestjs/common';
 
export class PostNotAuthorException extends UnauthorizedException {
  constructor(author: string) {
    super(`${author} you are not the author of this post`);
  }
}