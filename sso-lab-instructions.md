# Lab 1: Multi-Account Access Management with AWS IAM Identity Center

## Overview

In this lab, you will set up AWS IAM Identity Center to manage user access across multiple AWS accounts. You will create different permission sets like **Administrator** and **Developer**, assign users to these roles, and control access to different services across two AWS accounts. Instead of inviting an existing account, you will create a new AWS account through AWS Organizations.

## Objectives

- Enable AWS Organizations and create a new member account
- Set up AWS IAM Identity Center
- Create users and groups
- Create permission sets
- Assign users to permission sets and accounts
- Verify access by logging in as the users

## Prerequisites

- **One AWS account**: You need access to one AWS account with administrative privileges (this will be your Management Account).
- **Authenticator App**: Download an MFA app like Authy, Google Authenticator or Microsoft Authenticator. We'll be setting up MFA on our IAM identity Centre users.

---

## Step-by-Step Instructions

### 1. Enable AWS Organizations

**In your Management Account:**

1. **Sign in** to the AWS Management Console with your Management Account credentials.
2. Navigate to **AWS Organizations**:
   - Search for "Organizations" in the AWS services search bar.
3. If not already enabled, click on **"Create an organization"**.
   - Choose **"Enable All Features"**.
4. Note that your account is now the **Management Account** of your organization.

### 2. Create a New AWS Member Account

1. In AWS Organizations, go to **"Accounts"** on the left menu.
2. Click on **"Add an AWS account"**.
3. Choose **"Create an AWS account"**.
4. **Enter Account Details:**
   - **Account name**: `Member Account`
   - **Email address**: Use a unique email address that is not associated with any other AWS account (e.g., `your_email+member@example.com`).
5. Optionally, add tags to the account.
6. Click **"Create AWS account"**.
7. Wait for the account creation process to complete. This may take a few minutes.
8. Note down the **Account ID** of the new member account.

### 3. Enable AWS IAM Identity Center

**In the Management Account:**

1. Navigate to **AWS IAM Identity Center**:
   - Search for "IAM Identity Center" in the AWS services search bar.
2. Click on **"Enable"** to set up IAM Identity Center.


### 4. Verify Accounts in IAM Identity Center

1. In IAM Identity Center, click on **"AWS Accounts"** in the left menu.
2. Ensure both the **Management Account** and the **Member Account** are listed.
   - If not, wait a few minutes or refresh the page.

### 5. Create Users

1. Click on **"Users"** in the left menu.
2. Click **"Add user"**.
3. **Create User 1 (Admin User):**
   - Username: `admin_user`
   - First Name: `Admin`
   - Last Name: `User`
   - Email: `admin_user@example.com` (Use a valid email if possible, or plus addressing like we did earlier)
   - Password: Set a custom password and note it down - and click next through to the end and click `Create User.`
4. **Create User 2 (Developer User):**
   - Username: `dev_user`
   - First Name: `Dev`
   - Last Name: `User`
   - Email: `dev_user@example.com`
   - Password: Set a custom password.

You'll then have to go through your email accept the invitation, setting a password etc. 

### 6. Create Groups

1. Click on **"Groups"** in the left menu.
2. Click **"Create group"**.
3. **Create Group 1 (Administrators):**
   - Group Name: `Administrators`
   - Description: `Admin users with full access`
   - Add `admin_user` to the group.
4. **Create Group 2 (Developers):**
   - Group Name: `Developers`
   - Description: `Developers with limited access`
   - Add `dev_user` to the group.

### 7. Create Permission Sets

1. Click on **"Permission sets"** in the left menu.
2. Click **"Create permission set"**.

**Permission Set 1 (AdministratorAccess):**

- **Name**: `AdministratorAccess`
- **Description**: `Full admin access to all AWS services`
- **Permissions**:
  - Choose **"Create a Predefined permission set"**.
  - Click **"Attach AWS managed policies"**.
  - Select **"AdministratorAccess"**.
- Click **"Create"**.

**Permission Set 2 (DeveloperAccess):**

- **Name**: `DeveloperAccess`
- **Description**: `Access to developer-related AWS services`
- **Permissions**:
  - Choose **"Create a Predefined permission set"**.
  - Click **"Attach AWS managed policies"**.
  - Select **"PowerUserAccess"** (or create a custom policy for specific services).
- Click **"Create"**.

### 8. Assign Permission Sets to Groups

1. Navigate to **"AWS Accounts"** in IAM Identity Center.
2. Select **both the Management Account and the Member Account**.
3. Click **"Assign users and groups"**.

**Assign Administrators Group:**

- Select the **"Groups"** tab.
- Choose the **"Administrators"** group.
- Click **"Next: Permission sets"**.
- Select **"AdministratorAccess"** and **DeveloperAccess** permission sets.
- Click **"Submit"**.


### 9. Test User Access 

#### For `admin_user` and `dev_user`:

1. **Check Email Invitations:**
   - Both `admin_user` and `dev_user` will receive an email invitation to join AWS IAM Identity Center.
   - Open the invitation email and click on the **"Accept Invitation"** link.
2. **Set Up Your Password:**
   - You will be prompted to create a password for your IAM Identity Center account.
   - Follow the instructions to set a strong password.
3. **Register MFA Device (Optional but Recommended):**
   - After setting your password, you may be prompted to set up Multi-Factor Authentication (MFA).
   - Download an authenticator app (e.g., Google Authenticator, Authy) on your mobile device.
   - Scan the QR code displayed on the AWS setup page using the authenticator app.
   - Enter the

#### For `admin_user`:

1. Open a **new incognito/private browser window**.
2. Navigate to the IAM Identity Center User Portal:
   - You can find the URL in IAM Identity Center under **"Settings"** > **"User portal URL"**.
3. Log in with:
   - Username: `admin_user`
   - Password: (The one you set earlier)
   - At this point you'll be asked to enable MFA - the easiest way to do this is using an Authenticator App
4. Verify that you have access to both accounts with **AdministratorAccess** and log into your member account using Adminstrator Access. Here you can see that your user has native access across multiple roles within both accounts. 


#### 5. Try creating a new S3 bucket or IAM user to confirm permissions.

**Open AWS CloudShell:**

- From the AWS Management Console, click on the **CloudShell** icon located on the top navigation bar (it looks like a command prompt icon).
- Wait for the CloudShell environment to initialize. This may take a few moments.

**Test S3 Access:**

- **Create a new S3 bucket:**

  Run the following script in CloudShell to create a new S3 bucket, add files, list contents and delete everything also.  Replace `<your-unique-bucket-name>` with a globally unique bucket name (e.g., `admin-user-test-bucket-12345`):

```bash
#!/bin/bash

# Replace this with your unique bucket name
BUCKET_NAME="<your-unique-bucket-name>"
sleep 2
# Create a new S3 bucket
echo "Creating S3 bucket: $BUCKET_NAME"
aws s3 mb s3://$BUCKET_NAME
sleep 2
# Create a sample file to upload
echo "Creating a sample file: sample.txt"
echo "Hello, World!" > sample.txt
sleep 2
# Upload the file to the S3 bucket
echo "Uploading sample.txt to s3://$BUCKET_NAME/"
aws s3 cp sample.txt s3://$BUCKET_NAME/
sleep 2
# List the contents of the S3 bucket
echo "Listing contents of s3://$BUCKET_NAME/"
aws s3 ls s3://$BUCKET_NAME/
sleep 2
# Delete the file from the S3 bucket
echo "Deleting sample.txt from s3://$BUCKET_NAME/"
aws s3 rm s3://$BUCKET_NAME/sample.txt
sleep 2
# Delete the S3 bucket
echo "Deleting S3 bucket: $BUCKET_NAME"
aws s3 rb s3://$BUCKET_NAME --force
sleep 2
# Clean up local file
echo "Removing local file: sample.txt"
rm sample.txt
sleep 2
echo "Script execution completed."
```


#### For `dev_user`:

1. Open another **new incognito/private browser window**.
2. Navigate to the IAM Identity Center User Portal.
3. Log in with:
   - Username: `dev_user@example.com`
   - Password: (The one you set earlier)
4. If MFA is enabled, enter the verification code from your authenticator app.
5. Verify that you have access to both accounts with **DeveloperAccess**.
6. From the user portal, select one of the accounts to access the AWS Management Console.
7. **Open AWS CloudShell:**
   - Click on the **CloudShell** icon in the AWS Management Console.
8. **Attempt to Access IAM Services:**

- **Run the following command to list IAM users:**

 ```bash
 aws iam list-users
 ```

- **Expected Outcome:**

 You should receive an **Access Denied** error message similar to:

 ```
 An error occurred (AccessDenied) when calling the ListUsers operation: User: arn:aws:sts::ACCOUNT_ID:assumed-role/AWSReservedSSO_DeveloperAccess_... is not authorized to perform: iam:ListUsers on resource: *
 ```

 This confirms that `dev_user` does not have permissions to access IAM services due to the limitations of the **PowerUserAccess** policy.

9. **Test Access to Allowed Services:**

   Despite restrictions on IAM services, `dev_user` should have broad access to most other AWS services.

   **Run the same script from earlier to interact with S3:**

   ```bash
    #!/bin/bash

    # Replace this with your unique bucket name
    BUCKET_NAME="<your-unique-bucket-name>"
    sleep 2
    # Create a new S3 bucket
    echo "Creating S3 bucket: $BUCKET_NAME"
    aws s3 mb s3://$BUCKET_NAME
    sleep 2
    # Create a sample file to upload
    echo "Creating a sample file: sample.txt"
    echo "Hello, World!" > sample.txt
    sleep 2
    # Upload the file to the S3 bucket
    echo "Uploading sample.txt to s3://$BUCKET_NAME/"
    aws s3 cp sample.txt s3://$BUCKET_NAME/
    sleep 2
    # List the contents of the S3 bucket
    echo "Listing contents of s3://$BUCKET_NAME/"
    aws s3 ls s3://$BUCKET_NAME/
    sleep 2
    # Delete the file from the S3 bucket
    echo "Deleting sample.txt from s3://$BUCKET_NAME/"
    aws s3 rm s3://$BUCKET_NAME/sample.txt
    sleep 2
    # Delete the S3 bucket
    echo "Deleting S3 bucket: $BUCKET_NAME"
    aws s3 rb s3://$BUCKET_NAME --force
    sleep 2
    # Clean up local file
    echo "Removing local file: sample.txt"
    rm sample.txt
    sleep 2
    echo "Script execution completed."
    ```





In this section, you will create a custom permission set to further restrict the developer's access to specific AWS services. This allows you to enforce the principle of least privilege, granting users only the permissions they need.

#### Custom Permission Set

##### 1. Navigate to Permission Sets in IAM Identity Center

1. **Sign in** to the AWS Management Console with your **Management Account** credentials.
2. Navigate to **AWS IAM Identity Center**:
   - Search for **"IAM Identity Center"** in the AWS services search bar.
3. In the left navigation pane, click on **"Permission sets"**.
4. We are now going to built a new one, and we need to carry out some prequisites. 

##### 3. Create a Custom Permissions Policy in IAM

1. Go to **IAM** and create a custom permissions policy with the following JSON code to grant full access to S3 and read-only access to EC2:

   **Example Policy: Grant Full Access to S3 and Read-Only Access to EC2**

   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "AllowFullAccessS3",
               "Effect": "Allow",
               "Action": "s3:*",
               "Resource": "*"
           },
           {
               "Sid": "AllowReadOnlyAccessEC2",
               "Effect": "Allow",
               "Action": [
                   "ec2:Describe*",
                   "ec2:Get*"
               ],
               "Resource": "*"
           }
       ]
   }
  ```

- Save this policy to use in your permissions set configuration.

#### 4. Create a New Permission Set in IAM Identity Center

1. In IAM Identity Center, start by configuring a new permission set.

2. Configure Permission Set Details
 - Name: Enter CustomDeveloperAccess.
 - Description: Enter Custom permissions for developers with     restricted access.
 - Session duration: Leave at the default of 1 hour or adjust as needed.
 - Relay state: Leave blank unless required for your     configuration.
 - Click "Create".

3. Attach the Custom Permissions Policy
 - On the Attach permissions policies page, select Create a custom permissions policy.
 - Choose the custom policy created earlier in IAM and add it to your permissions set.


### 5. Create a new group and add it to the root account

4. Add Groups to Accounts
 - Once the permissions policy is attached to the permission set, add the CustomDeveloperAccess group to the necessary accounts.


# Now please test the permissions in the same way we did in earlier steps.

### 11. Implement Cross-Account Access Using S3 Bucket Policies

In this step, you will set up cross-account access to an S3 bucket in the **Management Account** for the `dev_user` in the **Member Account**. This will allow `dev_user` to read objects from a bucket in the Management Account, demonstrating cross-account resource sharing.

#### Step-by-Step Instructions

##### 1. Create an S3 Bucket in the Management Account

1. **Log in** to the AWS Management Console as `admin_user` and switch to the **Management Account**.
2. Navigate to the **S3** service.
3. Click on **"Create bucket"**.
4. **Configure Bucket Settings:**
   - **Bucket name**: Enter a globally unique name, e.g., `management-shared-bucket-<your-unique-id>`.
   - **Region**: Choose your preferred region (us-east-1 has been the default for the rest )
   - Leave other settings at their defaults.
5. Click **"Create bucket"**.
6. **Upload a Sample File:**
   - Select your new bucket.
   - Click on **"Upload"**.
   - Add a sample file from your local machine.
   - Click **"Upload"**.

##### 2. Add a Bucket Policy to Allow Cross-Account Access

1. In the S3 console, select the bucket you just created.
2. Go to the **"Permissions"** tab.
3. Scroll down to **"Bucket policy"** and click **"Edit"**.
4. **Enter the Following Bucket Policy:**


   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "AllowAdminUserAccessFromDifferentAccount",
               "Effect": "Allow",
               "Principal": {
                   "AWS": "arn:aws:iam::<target-account-id>:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_<permission-set-name>_<unique-suffix>"
               },
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket"
               ],
               "Resource": [
                   "arn:aws:s3:::<bucket-name>",
                   "arn:aws:s3:::<bucket-name>/*"
               ]
           }
       ]
   }

  ```

## Where to Find this Principal Placeholder Value

**`ARN of the role created by AWS in your target account `**
   - This is available in the `iam Roles` section of your AWS account in the target account. (Note! you'll have to somehow elevant your permissions to see this role!)

   One way you could this is to add `IamFullAccess` and add `S3ReadOnly` permissions to your permissions set and detach the `PowerUser` permissions.


 # Click "Save changes".

3. Test Access from the Member Account (dev_user)
Log in to the AWS Management Console as dev_user and switch to the Member Account.

# Open CloudShell.

1. Attempt to List the Bucket Contents:

2. Replace <your-unique-id> with the unique ID you used for the bucket name.

```bash
aws s3 ls s3://management-shared-bucket-<your-unique-id>
```
You should see a list of objects in the bucket.

Attempt to Download an Object:

Replace <object-key> with the key of the object you uploaded.

```bash
aws s3 cp s3://management-shared-bucket-<your-unique-id>/<object-key> ./
```
The object should download successfully.
Attempt to Delete an Object:

```bash
aws s3 rm s3://management-shared-bucket-<your-unique-id>/file.txt
```

**MAKE SURE YOU REMOVED THE ELEVATED PERMISSIONS OF YOUR DEV USER, OTHERWISE THIS MAY ACCIDENTLY WORK**

You should receive an Access Denied error because the bucket policy only allows GetObject and ListBucket actions.


4. Verify Permissions
This demonstrates that dev_user from the Member Account has read-only access to the S3 bucket in the Management Account as specified by the bucket policy.

Any attempts to perform actions not allowed by the bucket policy result in an Access Denied error.

## Cleanup

To avoid unexpected charges:

1. Delete any resources created during testing (e.g., EC2 instances, S3 buckets).
2. Remove users and groups if they are no longer needed.
3. If you want to disband the organization:
   - Remove the **Member Account** from the organization:
     - In AWS Organizations, select the **Member Account**.
     - Click **"Remove account"**.
     - Follow the prompts to remove the account.
   - **Note**: Before removing the member account, ensure you have access to it independently, as it will become standalone.
4. Delete the organization if desired:
   - In AWS Organizations, go to **"Settings"**.
   - Click **"Delete organization"**.

---

## Conclusion

Congratulations! You have successfully set up AWS IAM Identity Center to manage user access across multiple AWS accounts by creating a new member account through AWS Organizations. You learned how to create users, groups, and permission sets, and how to assign them to control access in a multi-account environment.

---

**Note:** Always follow best practices for security and governance when managing access to AWS resources.
