from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self,email,password=None,**extrafield):
        if not email:
            raise ValueError('email required')
        email=self.normalize_email(email)
        user=self.model(username=email,**extrafield)
        user.set_password(password)
        user.save(using=self.db)
        return user
    def create_superuser(self,email,password=None,**extrafield):
        extrafield.setdefault('is_staff',True)
        extrafield.setdefault('is_superuser',True)
        extrafield.setdefault('is_active',True)
        return self.create_user(email,password,**extrafield)

