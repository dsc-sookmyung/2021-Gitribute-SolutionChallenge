from django.contrib.auth.tokens import PasswordResetTokenGenerator
#from django.utils.six import text_type
#from django.utils import six

class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (        
            (str(user.pk) + str(timestamp)) + str(user.is_active)
        )
        
account_activation_token = AccountActivationTokenGenerator()
        