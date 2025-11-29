# EmailJS Troubleshooting Guide

If the contact form is not sending emails, follow these steps to diagnose and fix the issue.

## Step 1: Verify GitHub Secrets are Set

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Verify these three secrets exist:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`

**Important:** Make sure the values match exactly what you see in your EmailJS dashboard (no extra spaces, correct format).

## Step 2: Check Workflow Logs

1. Go to the **Actions** tab in your GitHub repository
2. Click on the latest workflow run
3. Look for these steps:
   - "Check if EmailJS secrets are set" - Should show "✓ All EmailJS secrets are set"
   - "Verify config file created" - Should show "✓ Config file created successfully"
   - "List files in js directory" - Should show `emailjs.config.js` exists

If any step fails, check the error message.

## Step 3: Verify Deployed Config File

After deployment, check if the config file exists on your live site:

1. Visit: `https://your-username.github.io/repo-name/js/emailjs.config.js`
   (Replace with your actual GitHub Pages URL)
2. You should see the config file with your credentials (this is safe - the Public Key is meant to be public)

If the file doesn't exist or shows placeholder values, the secrets weren't injected correctly.

## Step 4: Check Browser Console

1. Open your deployed website
2. Open browser Developer Tools (F12)
3. Go to the **Console** tab
4. Try submitting the contact form
5. Look for error messages:
   - If you see "EmailJS not configured properly!" → Secrets are not set or not injected
   - If you see EmailJS API errors → Check your EmailJS dashboard for service/template issues

## Step 5: Verify EmailJS Dashboard Settings

1. Log in to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Check your **Service** settings:
   - Service ID matches `EMAILJS_SERVICE_ID` secret
   - Service is active
3. Check your **Email Templates**:
   - Template ID matches `EMAILJS_TEMPLATE_ID` secret
   - Template variables match what's sent from the form:
     - `name`
     - `from_email`
     - `subject`
     - `message`
     - `time`
     - `to_email`
4. Check **Account** → **General**:
   - Public Key matches `EMAILJS_PUBLIC_KEY` secret
   - Account is active (not on free tier limits)

## Step 6: Test Locally

To test if EmailJS works at all:

1. Create `js/emailjs.config.js` locally with your actual credentials:
   ```javascript
   const EMAILJS_CONFIG = {
       SERVICE_ID: 'your_service_id',
       TEMPLATE_ID: 'your_template_id',
       PUBLIC_KEY: 'your_public_key'
   };
   ```
2. Open `index.html` in a browser
3. Try submitting the form
4. Check if you receive the email

If it works locally but not on the deployed site, the issue is with the GitHub Secrets injection.

## Common Issues

### Issue: "EmailJS not configured properly!" in console
**Solution:** GitHub Secrets are not set or not being injected. Re-check Step 1 and Step 2.

### Issue: Config file shows placeholder values on deployed site
**Solution:** The secrets are empty or the workflow didn't run. Check workflow logs and verify secrets are set.

### Issue: EmailJS API errors (400, 401, etc.)
**Solution:**
- Check EmailJS dashboard for service/template issues
- Verify template variable names match exactly
- Check if you've hit rate limits on free tier

### Issue: Form submits but no email received
**Solution:**
- Check spam folder
- Verify `to_email` in EmailJS template matches your email
- Check EmailJS dashboard for delivery logs
- Verify email service (Gmail, etc.) is properly connected in EmailJS

### Issue: Workflow fails with "Config file creation failed"
**Solution:**
- Check if `js/` directory exists in repository
- Verify workflow has write permissions
- Check workflow logs for specific error

## Still Not Working?

1. **Double-check all secret values** - Copy-paste directly from EmailJS dashboard
2. **Re-run the workflow** - Go to Actions → "Deploy Website" → "Run workflow"
3. **Clear browser cache** - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. **Check EmailJS origin restrictions** - Make sure your GitHub Pages domain is allowed
5. **Contact EmailJS support** - If everything else checks out, there might be an account issue

## Quick Verification Checklist

- [ ] All three GitHub Secrets are set
- [ ] Workflow runs successfully
- [ ] Config file exists on deployed site
- [ ] Browser console shows no "not configured" errors
- [ ] EmailJS dashboard shows service and template are active
- [ ] Template variables match form submission
- [ ] Email service is connected in EmailJS
- [ ] No rate limits exceeded
