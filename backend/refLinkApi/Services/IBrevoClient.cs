namespace refLinkApi.Services;

public interface IBrevoClient
{ 
    Task SendEmail(EmailTemplateRequest emailDetails);
}