insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, 
  email_confirmed_at, invited_at, 
  confirmation_token, confirmation_sent_at, 
  recovery_token, recovery_sent_at, 
  email_change_token_new, email_change, 
  email_change_sent_at, last_sign_in_at, 
  raw_app_meta_data, raw_user_meta_data, 
  is_super_admin, created_at, updated_at, 
  phone, phone_confirmed_at, phone_change, 
  phone_change_token, phone_change_sent_at, 
  email_change_token_current, email_change_confirm_status, 
  banned_until, reauthentication_token, 
  reauthentication_sent_at
) 
values 
  (
    '00000000-0000-0000-0000-000000000000', 
    '5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 
    'authenticated', 'authenticated', 
    'guillaume@onepilot.co', '$2a$10$w8eM0Q6FYQSmtE.LUrYPp.Fa9a8LkVrcfwoqiL1YFX3GNbR9x9dCG', 
    '2023-01-11 16:54:12.7991+00', 
    NULL, '', NULL, '', NULL, '', '', NULL, 
    '2023-01-11 16:54:12.801124+00', 
    '{"provider": "email", "providers": ["email"]}', 
    '{}', NULL, '2023-01-11 16:54:12.796822+00', 
    '2023-01-11 16:54:12.80197+00', 
    NULL, NULL, '', '', NULL, '', 0, NULL, 
    '', NULL
  );

select public.add_role_by_name('5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'admin');

INSERT INTO public.tickets (subject, assignee_id, status, tags, is_spam, last_answered_at, created_at, snoozed_at, read_at, deleted_at)
VALUES
  ('Sample Ticket 1', '5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'open', '{"tag1", "tag2"}', false, '2023-10-04 10:00:00', NOW(), NULL, NULL, NULL),
  ('Sample Ticket 2', '5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'closed', '{"tag3", "tag4"}', false, '2023-10-03 15:30:00', NOW(), NULL, NULL, NULL),
  ('Sample Ticket 3', NULL, 'open', '{"tag2"}', true, NULL, NOW(), NULL, NULL, NULL),
  ('Sample Ticket 4', '5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'open', NULL, false, NULL, NOW(), NULL, NULL, NULL);

  INSERT INTO public.messages (content_text, content_html, created_by, "from", "to", via, message_id, created_at, ticket_id, direction)

VALUES
  ('This is a sample text message 1', '<p>This is a sample HTML message 1</p>', NULL, 'user1@example.com', 'support@example.com', 'email', 'message_id_1', NOW(), 1, 'inbound'),
  ('This is a sample text message 2', '<p>This is a sample HTML message 2</p>', NULL, 'support@example.com', 'user1@example.com', 'email', 'message_id_2', NOW(), 2, 'outbound'),
  ('This is a sample text message 3', '<p>This is a sample HTML message 3</p>', NULL, 'user2@example.com', 'support@example.com', 'email', 'message_id_3', NOW(), 3, 'inbound'),
  ('This is a sample text message 4', '<p>This is a sample HTML message 4</p>', NULL, 'support@example.com', 'user2@example.com', 'email', 'message_id_4', NOW(), 3, 'outbound');