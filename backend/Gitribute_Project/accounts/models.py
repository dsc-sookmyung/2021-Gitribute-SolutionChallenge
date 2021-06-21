from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    customized User
    """
    #처음 사용자에게 공통으로 입력받는 값
    email = models.EmailField(max_length=64,unique=True,)
    username = models.CharField(max_length=30)
    image = models.ImageField(null=True, blank=True)
    role = models.IntegerField(null=True, blank=True)

    #나중에 추가적으로 받을 값
    center = models.CharField(max_length=50, null=True)

    #donor에게 나중에 필요한 값
    level = models.IntegerField(null=True, blank=True)
    liner = models.IntegerField(null=True, blank=True)
    medium = models.IntegerField(null=True, blank=True)
    large = models.IntegerField(null=True, blank=True)
    overnight = models.IntegerField(null=True, blank=True)
    
    #receiver에게 나중에 필요한 값
    total = models.IntegerField(null=True, blank=True)
    email_active = models.BooleanField(default=False)


    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=False,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.username

    def get_short_name(self):
        return self.email