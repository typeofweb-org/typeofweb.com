export type HookPayload =
  | DiscussionCreated
  | DiscussionDeleted
  | DiscussionCommentDeleted
  | DiscussionCommentCreated
  | { readonly action: 'unknown' };

export interface DiscussionCreated {
  readonly action: 'created';
  readonly discussion: Discussion;
  readonly repository: Repository;
  readonly organization: Organization;
  readonly sender: Sender;
}

export interface DiscussionDeleted {
  readonly action: 'deleted';
  readonly discussion: Discussion;
  readonly repository: Repository;
  readonly organization: Organization;
  readonly sender: Sender;
}

export interface DiscussionCommentDeleted {
  readonly action: 'deleted';
  readonly comment: Comment;
  readonly discussion: Discussion;
  readonly repository: Repository;
  readonly organization: Organization;
  readonly sender: Sender;
}

export interface DiscussionCommentCreated {
  readonly action: 'created';
  readonly comment: Comment;
  readonly discussion: Discussion;
  readonly repository: Repository;
  readonly organization: Organization;
  readonly sender: Sender;
}

interface Comment {
  readonly id: number;
  readonly node_id: string;
  readonly html_url: string;
  readonly parent_id: null;
  readonly child_comment_count: number;
  readonly repository_url: string;
  readonly discussion_id: number;
  readonly author_association: string;
  readonly user: Sender;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly body: string;
  readonly reactions: Reactions;
}

interface Discussion {
  readonly repository_url: string;
  readonly category: Category;
  readonly answer_html_url: null;
  readonly answer_chosen_at: null;
  readonly answer_chosen_by: null;
  readonly html_url: string;
  readonly id: number;
  readonly node_id: string;
  readonly number: number;
  readonly title: string;
  readonly user: Sender;
  readonly state: string;
  readonly locked: boolean;
  readonly comments: number;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly author_association: string;
  readonly active_lock_reason: null;
  readonly body: string;
  readonly reactions: Reactions;
  readonly timeline_url: string;
}

interface Category {
  readonly id: number;
  readonly repository_id: number;
  readonly emoji: string;
  readonly name: string;
  readonly description: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly slug: string;
  readonly is_answerable: boolean;
}

interface Reactions {
  readonly url: string;
  readonly total_count: number;
  readonly '+1': number;
  readonly '-1': number;
  readonly laugh: number;
  readonly hooray: number;
  readonly confused: number;
  readonly heart: number;
  readonly rocket: number;
  readonly eyes: number;
}

interface Sender {
  readonly login: string;
  readonly id: number;
  readonly node_id: string;
  readonly avatar_url: string;
  readonly gravatar_id: string;
  readonly url: string;
  readonly html_url: string;
  readonly followers_url: string;
  readonly following_url: string;
  readonly gists_url: string;
  readonly starred_url: string;
  readonly subscriptions_url: string;
  readonly organizations_url: string;
  readonly repos_url: string;
  readonly events_url: string;
  readonly received_events_url: string;
  readonly type: string;
  readonly site_admin: boolean;
}

interface Organization {
  readonly login: string;
  readonly id: number;
  readonly node_id: string;
  readonly url: string;
  readonly repos_url: string;
  readonly events_url: string;
  readonly hooks_url: string;
  readonly issues_url: string;
  readonly members_url: string;
  readonly public_members_url: string;
  readonly avatar_url: string;
  readonly description: string;
}

interface Repository {
  readonly id: number;
  readonly node_id: string;
  readonly name: string;
  readonly full_name: string;
  readonly private: boolean;
  readonly owner: Sender;
  readonly html_url: string;
  readonly description: string;
  readonly fork: boolean;
  readonly url: string;
  readonly forks_url: string;
  readonly keys_url: string;
  readonly collaborators_url: string;
  readonly teams_url: string;
  readonly hooks_url: string;
  readonly issue_events_url: string;
  readonly events_url: string;
  readonly assignees_url: string;
  readonly branches_url: string;
  readonly tags_url: string;
  readonly blobs_url: string;
  readonly git_tags_url: string;
  readonly git_refs_url: string;
  readonly trees_url: string;
  readonly statuses_url: string;
  readonly languages_url: string;
  readonly stargazers_url: string;
  readonly contributors_url: string;
  readonly subscribers_url: string;
  readonly subscription_url: string;
  readonly commits_url: string;
  readonly git_commits_url: string;
  readonly comments_url: string;
  readonly issue_comment_url: string;
  readonly contents_url: string;
  readonly compare_url: string;
  readonly merges_url: string;
  readonly archive_url: string;
  readonly downloads_url: string;
  readonly issues_url: string;
  readonly pulls_url: string;
  readonly milestones_url: string;
  readonly notifications_url: string;
  readonly labels_url: string;
  readonly releases_url: string;
  readonly deployments_url: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly pushed_at: Date;
  readonly git_url: string;
  readonly ssh_url: string;
  readonly clone_url: string;
  readonly svn_url: string;
  readonly homepage: string;
  readonly size: number;
  readonly stargazers_count: number;
  readonly watchers_count: number;
  readonly language: string;
  readonly has_issues: boolean;
  readonly has_projects: boolean;
  readonly has_downloads: boolean;
  readonly has_wiki: boolean;
  readonly has_pages: boolean;
  readonly forks_count: number;
  readonly mirror_url: null;
  readonly archived: boolean;
  readonly disabled: boolean;
  readonly open_issues_count: number;
  readonly license: null;
  readonly allow_forking: boolean;
  readonly is_template: boolean;
  readonly topics: readonly string[];
  readonly visibility: string;
  readonly forks: number;
  readonly open_issues: number;
  readonly watchers: number;
  readonly default_branch: string;
}
