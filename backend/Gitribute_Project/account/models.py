from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    use_in_migrations = True

    #일반유저 생성
    def create_user(self, email, nickname, image, password):
        if not email:
            raise ValueError('The given email must be set')
        
        user = self.model(
            email=UserManager.normalize_email(email),
            nickname=nickname,
            image=image,

        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    #슈퍼유저 생성
    def create_superuser(self, email, nickname, password):
    
        u = self.create_user(email=email,
                             nickname=nickname,
                             password=password,
                             )
        u.is_admin = True
        u.save(using=self._db)
        return u


class User(AbstractBaseUser, PermissionsMixin):
    """
    customized User, 이름, 이메일, 이미지 받도록 설정
    """
    email = models.EmailField(
        verbose_name=_('email id'),
        max_length=64,
        unique=True,
        help_text='EMAIL ID.'
        )
    nickname = models.CharField( 
        max_length=10, 
        blank=False, 
        unique=True, 
        default=''
        )
    image = models.ImageField(
        blank=True, 
        null=True
        )

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    #date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD='nickname'
    EMAIL_FIELD = 'email'
    #REQUIRED_FIELDS = ['nickname']

    def __str__(self):
        return self.username

    def get_short_name(self):
        return self.email

        
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin